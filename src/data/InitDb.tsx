import { getApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { firebaseConfig } from './FirebaseConfig'
import 'firebase/compat/firestore';


    export default class Db {
        init = () => {
            return firebase.initializeApp(firebaseConfig);
        }
    }
