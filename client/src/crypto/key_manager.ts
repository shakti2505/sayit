// generating private and public keys using web crypto API

import { arrayBufferTobase64 } from "./utils";

export const genrateAndStoreKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-256" },
    },
    true, // Keys are extractable
    ["encrypt", "decrypt"]
  );

  // export the private key
  const privateKey = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );

  // save private key in IndexedDB
  await storePrivateKeyInIndexedDB(privateKey);

  // save publickey for sharing
  const publicKey = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );

  const convertedPublicKey = arrayBufferTobase64(publicKey);

  return convertedPublicKey;
};

// retrieve keys
export const getPrivateKeyFromIndexedDB =
  async (): Promise<CryptoKey | null> => {
    const db = await openIndexedDB();
    const transaction = db.transaction("keys", "readonly");
    const store = transaction.objectStore("keys");
    const request = store.get("privateKey");

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const result = request.result;
        resolve(result || null); // Return the result if found, otherwise null
      };
      request.onerror = () => {
        reject(new Error("Key not found in IndexedDB"));
      };
    });
  };

// IndexedDB Helper: Store the Key
const storePrivateKeyInIndexedDB = async (key: ArrayBuffer) => {
  const db = await openIndexedDB();
  const transaction = db.transaction("keys", "readwrite");
  const store = transaction.objectStore("keys");

  const request = store.put({ keyName: "privateKey", key });
  return new Promise<void>((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () =>
      reject(new Error("Failed to store the private key in IndexedDB"));
  });
};

// indexedDB Helper: opend database
const openIndexedDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("sayIt_Database", 1);

    // Triggered when the database is successfully opened
    request.onsuccess = () => {
      resolve(request.result);
    };

    // Triggered if an error occurs while opening the database
    request.onerror = () => {
      reject(new Error(`IndexedDB error: ${request.error?.message}`));
    };

    // Triggered if the database version changes (e.g., first creation or upgrade)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create the "keys" object store if it doesn't already exist
      if (!db.objectStoreNames.contains("keys")) {
        db.createObjectStore("keys", { keyPath: "keyName" });
      }
    };
  });
};
