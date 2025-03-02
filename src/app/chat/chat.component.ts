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
    if (this.prompt) {
      console.log(this.prompt);
      const cleanedPrompt = this.#cleanCopiedText(this.prompt);

      this.#_chatService
        .sendMessage(cleanedPrompt)
        .subscribe((response: any) => {
          this.summary = response.summary;
          this.prompt = '';
        });
    }
  }

  #cleanCopiedText(text: string): string {
    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = text; // Convert HTML entities to plain text
    let cleanedText = tempElement.value;

    cleanedText = cleanedText
      .replace(/[\r\n]+/g, '\n') // Normalize line breaks
      .replace(/\s{2,}/g, ' ') // Remove extra spaces
      .replace(/[“”‘’]/g, '"') // Normalize smart quotes
      .replace(/&nbsp;/g, ' ') // Remove HTML spaces
      .replace(/&quot;/g, '"') // Convert &quot; to "
      .replace(/&amp;/g, '&') // Convert &amp; to &
      .trim();
    console.log(cleanedText);

    return cleanedText;
  }
}
