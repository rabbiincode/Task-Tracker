import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService{
  formatDate = (date: Date) => {
    const newDate = new Date("February 2, 2024 00:00:00")
    const formattedDate = newDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    return formattedDate
  }
}
