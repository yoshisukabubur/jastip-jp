import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-12">
      <div>
        <Link
          href="/"
          className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          ← ホーム
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">利用規約</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          最終更新: 2026年5月（ベータ版）
        </p>
      </div>

      <section className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">1. サービス内容</h2>
        <p>
          JastipJP は、日本とインドネシア間の代行・欲しいもの・話題を掲載する掲示板です。
          当サービスは取引の仲介、決済、配送の保証を行いません。
        </p>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">2. ユーザーの責任</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>投稿内容・連絡先交換・金銭のやり取りは利用者各自の責任です。</li>
          <li>法令、税関、禁制品、相手方の信頼性をご自身で確認してください。</li>
          <li>虚偽・詐欺・スパム・他人の権利を侵害する投稿は禁止します。</li>
        </ul>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">3. 運営者の免責</h2>
        <p>
          運営者は、利用者間のトラブル、損害、投稿の正確性について責任を負いません。
          不適切な利用が確認された場合、投稿の削除やアカウント制限を行うことがあります。
        </p>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">4. 個人情報</h2>
        <p>
          連絡先 URL 等はプロフィールに登録した場合、ログイン済みの利用者に表示されます。
          詳細は今後のプライバシーポリシーで定めます。
        </p>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">5. 変更</h2>
        <p>本規約は予告なく変更される場合があります。変更後の利用をもって同意したものとみなします。</p>
      </section>

      <p className="text-sm">
        取引のヒントは{" "}
        <Link href="/safety" className="text-emerald-700 underline dark:text-emerald-400">
          安全ガイド
        </Link>
        をご覧ください。
      </p>
    </main>
  );
}
