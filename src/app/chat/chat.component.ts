import { Component, inject, OnDestroy } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';

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
export class ChatComponent implements OnDestroy {
  prompt: string = '';
  loading = false;
  summary = '';
  #_chatService = inject(ChatService);
  #_bus = new Subscription();

  ngOnDestroy(): void {
    this.#_bus.unsubscribe();
  }
  onSubmit() {
    this.loading = true;
    if (this.prompt) {
      console.log(this.prompt);
      const cleanedPrompt = this.#cleanCopiedText(this.prompt);
      this.#_bus.add(
        this.#_chatService.sendMessage(cleanedPrompt).subscribe({
          next: (response: any) => {
            this.summary = response.summary;
            this.prompt = '';
            this.loading = false;
          },
          error: (error) => {
            console.error(error);
            this.loading = false;
          },
        })
      );
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
    // console.log(cleanedText);

    return cleanedText;
  }
}
