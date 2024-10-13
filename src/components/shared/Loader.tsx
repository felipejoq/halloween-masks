// Array con frases de carga inspiradas en halloween

const phrases = [
    "Conjurando espíritus... Espera un momento",
    "Mezclando ingredientes secretos... Un segundo",
    "Invocando fantasmas... Un instante",
    "Llamando a los espíritus... Un momento",
    "Preparando pociones mágicas... Un momento",
    "Invocando brujas amigas... Un segundo",
    ];


export const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-orange-500">
            <div className="flex flex-col items-center">
                <div className="text-6xl animate-bounce">🎃</div>
                <p className="text-2xl mt-4">
                    {
                        phrases[Math.floor(Math.random() * phrases.length)]
                    }
                </p>
            </div>
        </div>
    )
}