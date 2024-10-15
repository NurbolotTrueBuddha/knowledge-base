export class CreateArticleDto {
  readonly user_email?: string;
  readonly title: string;
  readonly body: string;
  readonly tags: string;
  readonly type: string;
}
export class UpdateArticleDto {
  readonly user_email?: string;
  readonly body?: string;
  readonly tags?: string;
  readonly type?: string;
}
