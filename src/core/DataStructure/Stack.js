export default class{
    constructor()
    {
        this.data = new Array();
    }

    Push(InItem)
    {
        this.data.push(InItem);
    }

    Pop()
    {
        return this.data.pop();
    }

    Front()
    {
        let _length = this.data.length;
        if(_length>0)
        {
            return this.data[_length-1];
        }
        return null;
    }

    Data(){
        return this.data;
    }

    Length(){
        return this.data.length;
    }
}