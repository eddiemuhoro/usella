

import { collection } from "firebase/firestore";
import { db } from "./init-firebase";

export const moviesCollectionRef = collection(db, 'movies')
export const productsCollectionRef = collection(db, 'products')
export const televisionsCollectionRef = collection(db, 'televisons')
export const beautyCollectionRef = collection(db, 'beauty')
export const topPicksCollectionRef = collection(db, 'topPicks')
export const uploadCollectionRef = collection(db, 'uploads')