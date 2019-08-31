export interface ITreeNode {
    id: number;
    name: string;
    key: string;
    type: 'Default' | 'Suggested';
    children: ITreeNode[];
}