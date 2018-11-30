let asesinos = [
    {
        nombre: "Jason Vorhees",
        img: "img/jason.jpg"
    },
    {
        nombre: "Michael Myers",
        img: "img/myers.jpg"
    },
    {
        nombre: "Leatherface",
        img: "img/leatherface.jpg"
    }
];

new Vue({

    el: "#app",
    data: {
        newGame: false,
        jugador: "",
        asesino: {},
        vida: [],
        eventos: [],
        terminado: false,
        atk_player: 0,
        atk_assasin: 0
    },
    methods: {
        iniciarJuego: function(){
            if (this.jugador)
            {
                // Reset a los Valores
                            //Random Attacks
                var minx = Math.ceil(1);
                var maxx = Math.floor(3);
                let rand = Math.floor(Math.random() * (maxx - minx + 1)) + minx;
                this.asesino = asesinos[rand-1];
                this.vida = [100,100];
                this.eventos= [];
                this.terminado = false;
                this.newGame = true;
            }
        },
        attack : function(min,max){
            //Random Attacks
            min = Math.ceil(min);
            max = Math.floor(max);

            this.atk_player = this.damage(min,max);
            
            if (this.atk_player == 16){
                this.atk_player = this.damage(45, 60);
            }

            this.vida[1] -= this.atk_player;

            this.assasin_atk();
            
            if (this.atk_player >= 45){
                this.eventos.push({
                    msj : 'You inflicted a insane amount of  ' + this.atk_player + ' damage to ' + this.asesino.nombre + ' with a CRITICAL HIT!',
                    type: 'crit'
                });
            }else{
                this.eventos.push({
                    msj : 'You inflicted ' + this.atk_player + ' of damage to ' + this.asesino.nombre + '!',
                    type: 'good'
                });
            }
            
            
            this.checkWin();

            

            var btn = document.getElementsByClassName("botongame");

            for (let index = 0; index < 4; index++) {
                btn[index].disabled = true;
            }

            setTimeout(function(){
                for (let index = 0; index < 4; index++) {
                btn[index].disabled = false;
            }
            },1500);

            if (this.atk_player > this.atk_assasin){
                document.getElementById("img-asesino").classList.add("animated","shake");
                setTimeout(function(){
                    document.getElementById("img-asesino").classList.remove("animated","shake");
                }, 1000);
            }else if (this.atk_assasin > this.atk_player){
                document.getElementById("img-jugador").classList.add("animated","shake");
                setTimeout(function(){
                    document.getElementById("img-jugador").classList.remove("animated","shake");
                }, 1000);
            }

            
        },
        assasin_atk: function(){
            var mina = 5;
            var maxa = 15;

            this.atk_assasin = this.damage(mina, maxa);

            if (this.atk_assasin == maxa){
                this.atk_assasin = this.damage(45, 60);
            }

            this.vida[0] -= this.atk_assasin;
            
            if (this.atk_assasin >= 45){
                this.eventos.push({
                    msj: this.asesino.nombre + ' slashed you with a CRITICAL HIT of ' + this.atk_assasin + ' Attack Points.',
                    type: 'crit'
                });
            }else{
                this.eventos.push({
                    msj: this.asesino.nombre + ' punished you with ' + this.atk_assasin + ' Attack Points.',
                    type: 'bad'
                });
            }
            
        },
        heal: function(){
            let healing = this.damage(8, 16);

            this.vida[0] += healing;

            this.assasin_atk();
            this.checkWin();

            this.eventos.push({
                msj: 'You have healed ' + healing + ' Health Points. ',
                type: 'good'
            });

        },
        damage: function(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        checkWin: function(){
            if (this.vida[0] <= 0){
                this.vida[0] = 0;
                alert(this.asesino.nombre + " killed you.");
                this.terminado = true;
                return;
            }else if (this.vida[1] <= 0){
                this.vida[1] = 0; 
                alert("You slained " + this.asesino.nombre + ". Congratulations!");
                this.terminado = true;
                return;            }
        }

    }
});