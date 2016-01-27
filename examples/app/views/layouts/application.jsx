export default function ({ children, javascripts }) {
  return (
    <html>
      <body>
        {children}
        {javascripts}
      </body>
    </html>
  );
}
