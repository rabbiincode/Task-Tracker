import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { addDoc, collection, collectionData, doc, deleteDoc, Firestore, updateDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class TaskService{
  constructor(private firestore: Firestore, private storage: AngularFireStorage){}
  taskRef = collection(this.firestore, 'tasks')

  getAllTasks = (): Observable<any[]> => {
    return collectionData(this.taskRef)
  }

  getTaskById = async (taskId: string): Promise<any> => {
    const getRef = doc(this.firestore, 'tasks', taskId)
    return await getDoc(getRef)
  }

  createTask = async (taskContent: Task) => {
    const newDocRef = await addDoc(this.taskRef, { ...taskContent, taskId: '' })
    return await updateDoc(newDocRef, { taskId: newDocRef.id })
  }

  updateTask = async (taskId: string, value: any): Promise<void> => {
    const updateDocRef = doc(this.taskRef, taskId)
    return await updateDoc(updateDocRef, value)
  }

  deleteTask = async (taskId: string) => {
    const deleteDocRef = doc(this.taskRef, taskId)
    return await deleteDoc(deleteDocRef)
  }
}
