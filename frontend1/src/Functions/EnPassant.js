const enPassant = (sourceMove, targetMove) => {
    switch(sourceMove) {
        case 'a5':
        {
            if(targetMove === 'b6') {
                return 'b5';
            }
        }
        case 'b5':
        {
            if(targetMove === 'a6') {
                return 'a5';
            }
            if(targetMove === 'c6') {
                return 'c5';
            }
        }
        case 'c5':
        {
            if(targetMove === 'b6') {
                return 'b5';
            }
            if(targetMove === 'd6') {
                return 'd5';
            }
        }
        case 'd5':
        {
            if(targetMove === 'c6') {
                return 'c5';
            }
            if(targetMove === 'e6') {
                return 'e5';
            }
        }
        case 'e5':
        {
            if(targetMove === 'd6') {
                return 'd5';
            }
            if(targetMove === 'f6') {
                return 'f5';
            }
        }
        case 'f5':
        {
            if(targetMove === 'e6') {
                return 'e5';
            }
            if(targetMove === 'g6') {
                return 'g5';
            }
        }
        case 'g5':
        {
            if(targetMove === 'f6') {
                return 'f5';
            }
            if(targetMove === 'h6') {
                return 'h5';
            }
        }
        case 'h5':
        {
            if(targetMove === 'g6') {
                return 'g5';
            }
        }
        case 'a4':
        {
            if(targetMove === 'b3') {
                return 'b4';
            }
        }
        case 'b4':
        {
            if(targetMove === 'a3') {
                return 'a4';
            }
            if(targetMove === 'c3') {
                return 'c4';
            }
        }
        case 'c4':
        {
            if(targetMove === 'b3') {
                return 'b4';
            }
            if(targetMove === 'd3') {
                return 'd4';
            }
        }
        case 'd4':
        {
            if(targetMove === 'c3') {
                return 'c4';
            }
            if(targetMove === 'e3') {
                return 'e4';
            }
        }
        case 'e4':
        {
            if(targetMove === 'd3') {
                return 'd4';
            }
            if(targetMove === 'f3') {
                return 'f4';
            }
        }
        case 'f4':
        {
            if(targetMove === 'e3') {
                return 'e4';
            }
            if(targetMove === 'g3') {
                return 'g4';
            }
        }
        case 'g4':
        {
            if(targetMove === 'f3') {
                return 'f4';
            }
            if(targetMove === 'h3') {
                return 'h4';
            }
        }
        case 'h4':
        {
            if(targetMove === 'g3') {
                return 'g4';
            }
        }
        default:
        {
            return false;
        }
    }
};

export { enPassant };