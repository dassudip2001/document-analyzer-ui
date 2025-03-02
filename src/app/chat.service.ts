import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  BASE_URL = 'https://document-analyzer-brown.vercel.app';
  constructor(private http: HttpClient) {}

  sendMessage(text: string) {
    return this.http.post('/analyze', { text });
  }
}
