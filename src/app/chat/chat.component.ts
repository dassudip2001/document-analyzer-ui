import { Component, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

export type ResponseT = {
  summary: string;
  prompt: string;
};

@Component({
  selector: 'app-chat',
  imports: [MarkdownComponent, FormsModule],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {
  prompt: string = '';
  summary = '';
  #_chatService = inject(ChatService);
  onSubmit() {
    this.prompt = this.prompt.trim().replace(/\s+/g, ' '); // Remove extra spaces

    if (this.prompt) {
      console.log(this.prompt);

      this.#_chatService.sendMessage(this.prompt).subscribe((response: any) => {
        this.summary = response.summary;
        this.prompt = '';
      });
    }
  }
}
