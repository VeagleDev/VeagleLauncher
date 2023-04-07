
function getStateLabel(state: string) {
    switch (state) {
        case 'getting-info':
            return 'Récupération des infos';
        case 'error':
            return 'Erreur';
        case 'finished':
            return 'Installation terminée';
        case 'checking-space':
            return 'Vérification espace disque';
        case 'downloading':
            return 'Téléchargement';
        case 'unzipping':
            return 'Décompression';
        default:
            return 'Etat inconnu';
    }
}

function DownloadBox(informations: any) {
    // @ts-ignore
    const step = informations.informations.step;
    const percentage = informations.informations.percentage;
    return (
        <div className="bg-gray-900 rounded-md shadow-lg px-6 py-8 mb-16">
            <div className="flex items-center mb-6">
                {step === "error" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.949 3.636a1 1 0 011.414 1.414L6.414 17.364a1 1 0 01-1.414-1.414l10.949-10.314a1 1 0 000-1.414L6.414 3.222a1 1 0 011.414-1.414l10.949 10.314a1 1 0 000 1.414l.01-.01z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : step === "finished" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17.707 4.293a1 1 0 010 1.414L8.414 15.414a1 1 0 01-1.414 0L2.293 10.707a1 1 0 011.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#48bb78" strokeWidth="10" strokeDasharray="70 200" strokeLinecap="round">
                            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                )}
                <p className="text-gray-500 ml-6 text-sm overflow-hidden">{getStateLabel(step)}</p>
            </div>

            {step === "error" ? (
                <p className="text-red-500 text-sm font-medium mb-4">
                    Une erreur est survenue lors du téléchargement.
                </p>
            ) : step === "finished" ? (
                <p className="text-green-500 text-sm font-medium mb-4">
                    Téléchargement terminé !
                </p>
            ) : (
                <div className="relative w-full h-1 bg-gray-900 rounded-full">
                    <div
                        className={`absolute left-0 top-0 h-full bg-green-500 rounded-full transform transition-all duration-500`}
                        style={{ width: `100%`, transform: `scaleX(${percentage / 100})`, backgroundColor: "#48bb78", transition: "all 0.5s ease-in-out", transformOrigin: "left" }}
                    ></div>
                    <span className="absolute top-0 right-0 text-sm text-gray-500">{percentage}%</span>
                </div>


            )}
        </div>
    );
}

export default DownloadBox;