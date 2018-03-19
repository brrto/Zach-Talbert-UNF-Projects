using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestroyByContact : MonoBehaviour {

    public AudioSource clang;
    public AudioSource grunt;

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Shuriken")
        {
            clang.pitch = Random.Range(.75f, 1.25f);
            clang.Play();
        }

        if (transform.parent.parent.tag == "Player2") // If p2 threw the shuriken
        {
            if (other.gameObject.tag == "EnergyBall") // If the ball was hit
            {
                Destroy(gameObject); // Destroy shot
                transform.parent.parent.GetComponent<EnergyManager>().addEnergy(); // Add to player's energy
            }
            if (other.gameObject.tag == "Player") // If the other player was hit
            {
                Destroy(gameObject); // Destroy shot
                other.gameObject.GetComponent<HealthManager>().loseHealth(); // Player 1 losses health
                grunt.enabled = true;
                grunt.pitch = Random.Range(.75f, 1.25f);
                grunt.Play();
            }
        }

        if (transform.parent.parent.tag == "Player") // If p1 threw the shuriken
        {
            if (other.gameObject.tag == "EnergyBall") // If the ball was hit
            {
                Destroy(gameObject); // Destroy shot
                transform.parent.parent.GetComponent<EnergyManager>().addEnergy(); // Add to player's energy
            }
            if (other.gameObject.tag == "Player2") // If the other player was hit
            {
                Destroy(gameObject); // Destroy shot
                other.gameObject.GetComponent<HealthManager>().loseHealth(); // Player 2 losses health
                grunt.enabled = true;
                grunt.pitch = Random.Range(.75f, 1.25f);
                grunt.Play();
            }
        }
    }
}
