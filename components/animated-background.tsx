"use client";

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-100 to-pink-50 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            className="stroke-blue-500 stroke-2 fill-none animate-wave"
          />
          <path
            d="M0,60 Q25,40 50,60 T100,60"
            className="stroke-purple-500 stroke-2 fill-none animate-wave-slow"
          />
        </svg>
      </div>
    </div>
  );
};