import { GameMap } from '../../GameMap/GameMap';
import { AreaType, ITiledMapRectangleObject } from '../../types';
import { Command } from "../Command";
import { CreateAreaCommandConfig } from './CreateAreaCommand';

export interface DeleteAreaCommandConfig {
    type: "DeleteAreaCommand";
    id: number;
}

export class DeleteAreaCommand extends Command {
    private areaConfig: ITiledMapRectangleObject;

    private gameMap: GameMap;
    
    constructor(gameMap: GameMap, config: DeleteAreaCommandConfig) {
        super();
        this.gameMap = gameMap;
        const areaConfig = gameMap.getGameMapAreas().getArea(config.id, AreaType.Static);
        if (!areaConfig) {
            throw new Error('Trying to delete a non existing Area!');
        }
        this.areaConfig = structuredClone(areaConfig);
    }

    public execute(): DeleteAreaCommandConfig {
        if (!this.gameMap.getGameMapAreas().deleteAreaById(this.areaConfig.id, AreaType.Static)) {
            throw new Error(`MapEditorError: Could not execute DeleteArea Command. Area ID: ${this.areaConfig.id}`);
        }
        return { type: 'DeleteAreaCommand', id: this.areaConfig.id };
    }

    public undo(): CreateAreaCommandConfig {
        if (!this.gameMap.getGameMapAreas().addArea(this.areaConfig, AreaType.Static)) {
            throw new Error(`MapEditorError: Could not undo DeleteArea Command. Area ID: ${this.areaConfig.id}`);
        }
        return { type: 'CreateAreaCommand', areaObjectConfig: this.areaConfig };
    }
}
