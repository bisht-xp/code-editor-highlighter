import CodeEditor from "@/components/CodeEditor";
import Link from "next/link";

const Home = () => {
  return (
    <div className="container mx-auto p-4 h-screen w-full bg-gradient-to-r from-black to-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4 md:mb-14 text-center">
        Code Editor
      </h1>
      <div className="flex flex-col w-full md:flex-row justify-center justify-items-center items-center gap-10 md:gap-5">
        <div className="w-full lg:w-[50%]">
          <div className="flex flex-col justify-center items-center gap-5 bg-gray-950 text-white p-6 rounded-lg shadow-lg shadow-gray-500">
            <h3 className="py-5 px-5 text-center">
              A simple code editor with syntax highlighting for JSX.
            </h3>
            <Link
              href={"https://github.com/bisht-xp/code-editor-highlighter"}
              target="_blank"
              className="py-3 px-5 bg-blue-700 rounded text-white font-bold hover:bg-blue-600 transition-all duration-300 "
            >
              Github Link
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[50%] h-[500px] overflow-auto bg-gray-950 p-6 rounded-lg shadow-lg shadow-gray-500">
          <CodeEditor
            padding={10}
            style={{
              fontSize: 14,
              minHeight: 450,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;