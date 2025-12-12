export default function Loader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}