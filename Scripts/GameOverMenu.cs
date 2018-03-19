using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class GameOverMenu : MonoBehaviour {

    public GameObject GameOverUI;

    private bool gameOver = false;
    private HealthManager check1;
    private HealthManager check2;

    void Start ()
    {
        GameOverUI.SetActive(false);
        check1 = GameObject.FindGameObjectWithTag("Player").GetComponent<HealthManager>();
        check2 = GameObject.FindGameObjectWithTag("Player2").GetComponent<HealthManager>();
    }
	
	void Update ()
    {
        if (check1.gameOver || check2.gameOver)
            gameOver = true;

        if (gameOver)
        {
            GameOverUI.SetActive(true);
            //Time.timeScale = 0;
        }
	}

    public void playAgain ()
    {
        SceneManager.LoadScene("Main");
    }

    public void hardMode()
    {
        SceneManager.LoadScene("EasyMode");
    }

    public void quit ()
    {
        Application.Quit();
    }
}
