import { Component,
		 OnInit,
		 Injectable }  
	from '@angular/core';

import { HttpClient }
	from '@angular/common/http';

import { RouterModule,
		 Router,
		 ActivatedRoute
		}
	from '@angular/router';

import { User }
	from '../user';
import { Question }
	from '../question';
import { sendAnswerResponse }
	from '../sendAnswerResponse';
import { viewGameResponse }
	from '../viewGameResponse';

import { MatGridListModule,
		 MatButtonToggleModule,
		 MatButtonModule,
		 MatTabsModule,
		 MatListModule,
		}
	from '@angular/material';

import { GameService } 
	from '../game.service';


@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})


@Injectable()
export class GamePlayComponent implements OnInit {
	inGame = false;
	game = {};
	currentQuestion : Question;
	currentRound	: number = 1

  constructor(
	private http    	: HttpClient,
	public  router  	: Router,
	private route 		: ActivatedRoute,
	private GameService : GameService
  ) { }


  ngOnInit() {
  	this.viewGame(this.route.snapshot.params.gameID);
  }

  viewGame(gameID: string): void{
  	this.GameService.viewGame(gameID).subscribe(
		(viewGameResponse: viewGameResponse) => {
			if (viewGameResponse.ok){
				
				this.game = viewGameResponse.game;
    		    
    		    this.currentQuestion = this.game.questions[0];

	    		viewGameResponse.game.teams.forEach(function(team){
	    			team.players.forEach(function(player){
	    				console.log(player.player);
	    				console.log(localStorage.getItem("username"));

	    				if (player.player == localStorage.getItem("username")){
	    					this.inGame = true;
	    				}
	    			});
	    		});
	    		
			}
			else {

			}
		}
    );
  }


	sendAnswer(answer: string): void{
		this.GameService.sendAnswer(this.game.name, this.currentRound, answer).subscribe(
		(sendAnswerResponse: sendAnswerResponse) => {
			if (sendAnswerResponse.ok){
				this.loadNextQuestion();
			} else {
				console.log('errooooooooooor');
				this.loadNextQuestion();
			}
		});
	}

	loadNextQuestion(): void{
		this.currentRound += 1;
		this.currentQuestion = this.game.questions[this.currentRound - 1];
	}



}

