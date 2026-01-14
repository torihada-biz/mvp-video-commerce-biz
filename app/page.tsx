import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white mb-4">
          Video Commerce MVP
        </h1>
        <p className="text-xl text-white/90 mb-8">
          動画コマースウィジェット
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            管理画面
          </Link>
          <Link
            href="/embed"
            className="px-6 py-3 bg-white/20 text-white border-2 border-white rounded-lg font-semibold hover:bg-white/30 transition"
          >
            ウィジェット表示
          </Link>
        </div>
      </div>
    </div>
  );
}
