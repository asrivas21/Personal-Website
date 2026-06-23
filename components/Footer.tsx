export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] py-8 px-6 max-w-5xl mx-auto flex items-center justify-between text-sm text-[#9B9B9B]">
      <span>Aman Srivastava</span>
      <div className="flex gap-6">
        <a
          href="mailto:amansrivastava13572@gmail.com"
          className="hover:text-[#0A0A0A] transition-colors"
        >
          email
        </a>
        <a
          href="https://github.com/asrivas21"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#0A0A0A] transition-colors"
        >
          github
        </a>
        <a
          href="https://linkedin.com/in/aman-srivastava-88652a210"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#0A0A0A] transition-colors"
        >
          linkedin
        </a>
      </div>
    </footer>
  );
}
