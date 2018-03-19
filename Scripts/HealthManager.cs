using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HealthManager : MonoBehaviour {

    public int health;
    public bool gameOver = false;

    public void loseHealth()
    {
        if (health > 0)
        {
            health -= 1;
        }

        if (health < 1)
        {
            if (gameObject.tag == "Player")
            {
                GameObject.FindGameObjectWithTag("Health1").SetActive(false);
                //P2DeadSprite.SetActive(true);
            }
            if (gameObject.tag == "Player2")
            {
                GameObject.FindGameObjectWithTag("Health2").SetActive(false);
                //P2DeadSprite.SetActive(true);
            }

            gameOver = true;
            gameObject.SetActive(false);
            //GetComponent<SpriteRenderer>().sprite = null;
            //Destroy(gameObject);
        }
    }

    public void addHealth ()
    {
        if (health < 10)
        {
            health += 2;
        }
    }
}
