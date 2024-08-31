
class Solution{
    public char[][] updateBoard(char[][] board, int[] click) {
        char cl=board[click[0]][click[1]];
        if(cl=='M'){
            board[click[0]][click[1]]='X';
            return board;
        }
        if(cl=='E')
        {
            int[][] o=new int[board.length][board[0].length];
            Integ(board,o);
            bfs(board,click,o);
        }
        return board;
        }
    public void Integ(char[][] board, int[][] o)
    {
            for (int x = 0; x < board.length; x++) {
                for (int y = 0; y < o[0].length; y++) {
                    if(board[x][y]=='M'){
                    for(int i=-1;i<2;i++)
                {
                    for(int j=-1;j<2;j++)
                    {
                        if(x+i>=0 && y+j>=0 && x+i<board.length && y+j<board[0].length && !(i==0 && j==0))
                        {
                            o[x+i][y+j]++;
                        }
                
                    }
            
                }
                    }

                }
            }
        }
    public void bfs(char[][] b,int[] click,int[][] o)
        {
            int x=click[0];
            int y=click[1];
            if(o[x][y]>0){
            b[x][y]=(char)((int)('0')+o[x][y]);
            return;
            }
            else{
                b[x][y]='B';
            }

            for(int i=-1;i<2;i++)
            {
                for(int j=-1;j<2;j++)
                {
                    if(x+i>=0 && y+j>=0 && x+i<b.length && y+j<b[0].length && !(i==0 && j==0))
                    {
                        if(o[x+i][y+j]>0)
                        {
                            b[x+i][y+j]=(char)((int)('0')+o[x+i][y+j]);
                        }
                        else{
                            if(b[x+i][y+j]=='E')
                            bfs(b,new int[]{(x+i),(y+j)}, o);
                        }
                    }
            
                }

            }
        }
}