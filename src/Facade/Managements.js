export default class{
    static get SceneManager(){
        return Managements.SceneManager.Instance;
    }

    static get PoolManager(){
        return Managements.PoolManager.Instance;
    }

    static get UIManager(){
        return Managements.UIManager.Instance;
    }

    static get GameController(){
        return Managements.GameController.Instance;
    }

    static get ResourceManager(){
        return Managements.ResourceManager.Instance;
    }
}