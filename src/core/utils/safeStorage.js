/**
 * 📦 Safe Storage Utility
 * 
 * Wrapper seguro para localStorage que maneja:
 * - Tracking Prevention (Safari, Firefox ITP, Edge)
 * - Incognito mode bloqueado
 * - Private browsing mode
 * - Storage quota exceeded
 */

const StorageType = {
    LOCAL: 'localStorage',
    SESSION: 'sessionStorage',
};

/**
 * Verificar si localStorage está disponible
 */
const isStorageAvailable = (type = StorageType.LOCAL) => {
    try {
        const storage = window[type];
        const testKey = '__test_' + Date.now();
        storage.setItem(testKey, 'test');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        // Tracking Prevention, incognito/private mode, o quota exceeded
        console.warn(`⚠️ ${type} no disponible:`, error.message);
        return false;
    }
};

/**
 * Obtener item de storage de forma segura
 */
export const safeGetItem = (key, fallback = null, type = StorageType.LOCAL) => {
    try {
        if (!isStorageAvailable(type)) {
            return fallback;
        }
        const value = window[type].getItem(key);
        return value !== null ? value : fallback;
    } catch (error) {
        console.warn(`⚠️ Error al leer ${type}.${key}:`, error.message);
        return fallback;
    }
};

/**
 * Guardar item en storage de forma segura
 */
export const safeSetItem = (key, value, type = StorageType.LOCAL) => {
    try {
        if (!isStorageAvailable(type)) {
            console.warn(`⚠️ No se pudo guardar ${key}: storage no disponible`);
            return false;
        }
        window[type].setItem(key, value);
        return true;
    } catch (error) {
        console.warn(`⚠️ Error al guardar ${type}.${key}:`, error.message);
        return false;
    }
};

/**
 * Remover item de storage de forma segura
 */
export const safeRemoveItem = (key, type = StorageType.LOCAL) => {
    try {
        if (!isStorageAvailable(type)) {
            return false;
        }
        window[type].removeItem(key);
        return true;
    } catch (error) {
        console.warn(`⚠️ Error al remover ${type}.${key}:`, error.message);
        return false;
    }
};

/**
 * Limpiar todo el storage de forma segura
 */
export const safeClearStorage = (type = StorageType.LOCAL) => {
    try {
        if (!isStorageAvailable(type)) {
            return false;
        }
        window[type].clear();
        return true;
    } catch (error) {
        console.warn(`⚠️ Error al limpiar ${type}:`, error.message);
        return false;
    }
};

export default {
    safeGetItem,
    safeSetItem,
    safeRemoveItem,
    safeClearStorage,
    StorageType,
    isStorageAvailable,
};
