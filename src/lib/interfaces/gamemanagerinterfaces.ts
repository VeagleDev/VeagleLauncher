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

interface InstallStatus {
    gameId: number;
    status: string;
    progress: number;
}

interface LaunchedGame {
    gameId: number;
    status: string;
}