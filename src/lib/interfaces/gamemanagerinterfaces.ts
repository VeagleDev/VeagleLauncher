interface Game {
    id: number;
    name: string;
    installed: boolean;
    path: string;
    link: string;
    version: string;
    image: string;
    stats: any;
    size: number;
}

export default interface InstallStatus {
    gameId: number;
    status: string;

    message: string;

    active: boolean;
    progress: number;
}

interface LaunchedGame {
    gameId: number;
    status: string;
}