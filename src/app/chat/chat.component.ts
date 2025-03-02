import { Component, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-chat',
  imports: [MarkdownComponent, FormsModule],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {
  prompt: string = '';
  chatHistory: any[] = [];
  #_chatService = inject(ChatService);
  onSubmit() {
    console.log(this.prompt);

    this.#_chatService.sendMessage(this.prompt).subscribe((response: any) => {
      this.chatHistory.push({
        prompt: this.prompt,
        response: response.text,
      });
      this.prompt = '';
    });
  }
}
