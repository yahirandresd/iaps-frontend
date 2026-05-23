export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-white rounded-lg border border-gris-borde shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
