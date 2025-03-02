import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(text: string) {
    return this.http.post(
      'https://document-analyzer-brown.vercel.app/analyze',
      { text }
    );
  }
}
