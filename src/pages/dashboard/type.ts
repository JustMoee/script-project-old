

export type TableHeader =  {
    key: string;
    name: string    
}

export type TableData = {
    pos: number;
    action: any;
    [key: string]: string | number | Date | any
}