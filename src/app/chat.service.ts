import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  BASE_URL = 'https://document-analyzer-brown.vercel.app';
  constructor(private http: HttpClient) {}

  sendMessage(text: string) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('/analyze', { text });
  }
}
