import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center px-6 lg:px-16 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,#e3d8ff_15%,transparent_40%),radial-gradient(circle_at_10%_90%,#dbe6ff_15%,transparent_40%)]" />

      <div className="relative z-10 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-[#5B4B8A] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sobre o DoNation
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          O <span className="font-semibold text-[#7B6DCE]">DoNation</span> nasceu de um projeto de faculdade com um propósito simples:
          aproximar quem quer ajudar de quem mais precisa.  
          O que começou como uma ideia acadêmica, hoje é uma das maiores plataformas de doação
          para instituições sociais em todo o Brasil.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Conectamos pessoas, empresas e entidades de forma transparente, segura e humana — porque
          acreditamos que doar é um gesto capaz de transformar o mundo, um ato de cada vez.  
          E o nosso compromisso é tornar essa transformação cada vez mais acessível.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a
            href="/cadastro"
            className="px-8 py-3 bg-[#bba7ff] hover:bg-[#a693ff] text-white font-medium rounded-full shadow-md transition-all duration-300"
          >
            Junte-se a nós 💜
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-[#d4c8ff] rounded-full blur-3xl opacity-40"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-[#c8d6ff] rounded-full blur-3xl opacity-40"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
