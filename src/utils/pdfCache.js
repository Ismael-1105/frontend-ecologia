/**
 * PDF Cache System
 * In-memory cache for PDF blob URLs to avoid unnecessary network requests
 */

class PDFCache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 20; // Maximum number of PDFs to cache
        this.accessOrder = []; // LRU tracking
    }

    /**
     * Get cached PDF URL
     * @param {string} id - Upload ID
     * @returns {string|null} Cached URL or null
     */
    get(id) {
        if (!this.cache.has(id)) {
            return null;
        }

        // Update access order (LRU)
        this.accessOrder = this.accessOrder.filter(key => key !== id);
        this.accessOrder.push(id);

        const cached = this.cache.get(id);
        
        // Check if cache entry is still valid (not expired)
        if (cached.expiresAt && Date.now() > cached.expiresAt) {
            this.remove(id);
            return null;
        }

        return cached.url;
    }

    /**
     * Set PDF URL in cache
     * @param {string} id - Upload ID
     * @param {string} url - Blob URL
     * @param {number} ttl - Time to live in milliseconds (default: 30 minutes)
     */
    set(id, url, ttl = 30 * 60 * 1000) {
        // Evict oldest entry if cache is full
        if (this.cache.size >= this.maxSize && !this.cache.has(id)) {
            const oldestKey = this.accessOrder.shift();
            this.remove(oldestKey);
        }

        const expiresAt = ttl ? Date.now() + ttl : null;
        
        this.cache.set(id, { url, expiresAt, cachedAt: Date.now() });
        
        // Update access order
        this.accessOrder = this.accessOrder.filter(key => key !== id);
        this.accessOrder.push(id);
    }

    /**
     * Remove PDF from cache and revoke URL
     * @param {string} id - Upload ID
     */
    remove(id) {
        const cached = this.cache.get(id);
        if (cached?.url) {
            try {
                window.URL.revokeObjectURL(cached.url);
            } catch (e) {
                console.warn('Failed to revoke URL:', e);
            }
        }
        
        this.cache.delete(id);
        this.accessOrder = this.accessOrder.filter(key => key !== id);
    }

    /**
     * Clear all cached PDFs
     */
    clear() {
        this.cache.forEach((cached) => {
            if (cached.url) {
                try {
                    window.URL.revokeObjectURL(cached.url);
                } catch (e) {
                    console.warn('Failed to revoke URL:', e);
                }
            }
        });
        
        this.cache.clear();
        this.accessOrder = [];
    }

    /**
     * Check if PDF is cached
     * @param {string} id - Upload ID
     * @returns {boolean}
     */
    has(id) {
        return this.get(id) !== null;
    }

    /**
     * Get cache statistics
     * @returns {Object} Cache stats
     */
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            keys: Array.from(this.cache.keys()),
            usage: `${this.cache.size}/${this.maxSize}`
        };
    }

    /**
     * Clean expired entries
     */
    cleanExpired() {
        const now = Date.now();
        const expiredKeys = [];

        this.cache.forEach((cached, key) => {
            if (cached.expiresAt && now > cached.expiresAt) {
                expiredKeys.push(key);
            }
        });

        expiredKeys.forEach(key => this.remove(key));

        return expiredKeys.length;
    }
}

// Singleton instance
const pdfCache = new PDFCache();

// Clean expired entries every 5 minutes
if (typeof window !== 'undefined') {
    setInterval(() => {
        const cleaned = pdfCache.cleanExpired();
        if (cleaned > 0) {
            console.log(`PDF Cache: Cleaned ${cleaned} expired entries`);
        }
    }, 5 * 60 * 1000);
}

export default pdfCache;
