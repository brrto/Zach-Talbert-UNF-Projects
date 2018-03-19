using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveShuriken : MonoBehaviour {

    public float speed; // Shot speed
    public float spin; // Shot rotation
    public float lifespan; // Time until the shot is destroyed

    private float timestamp; // Used to check how long since shot was instantiated

	// Use this for initialization
	void Start ()
    {
        timestamp = Time.time; // Set timestamp

        // Reverse shot direction and spin for player2
        if (transform.parent.parent.tag == "Player2" || ((transform.parent.tag == "FanUp" || transform.parent.tag == "FanDown") && transform.parent.parent.parent.tag == "Player2"))
        {
            speed *= -1;
            spin *= -1;

            if (transform.parent.tag == "FanUp")
            {
                GetComponent<Rigidbody2D>().velocity = new Vector2(1, -0.2f) * speed; // Move shot forward and up
            }
            else if (transform.parent.tag == "FanDown")
            {
                GetComponent<Rigidbody2D>().velocity = new Vector2(1, 0.2f) * speed; // Move shot forward and down
            }
            else
            {
                GetComponent<Rigidbody2D>().velocity = new Vector2(1, 0) * speed; // Move shot straight forward
            }
        }
        if (transform.parent.parent.tag == "Player" || ((transform.parent.tag == "FanUp" || transform.parent.tag == "FanDown") && transform.parent.parent.parent.tag == "Player"))
        {
            if (transform.parent.tag == "FanUp")
            {
                GetComponent<Rigidbody2D>().velocity = new Vector2(1, 0.2f) * speed; // Move shot forward and up
            }
            else if (transform.parent.tag == "FanDown")
            {
                GetComponent<Rigidbody2D>().velocity = new Vector2(1, -0.2f) * speed; // Move shot forward and down
            }
            else
            {
                GetComponent<Rigidbody2D>().velocity = new Vector2(1, 0) * speed; // Move shot straight forward
            }
        }
    }

    void Update ()
    {
        // Check lifespan vs time passed and destroy the shot
        if (lifespan < Time.time - timestamp)
            Destroy(gameObject);
    }

    void FixedUpdate ()
    {
        GetComponent<Transform>().Rotate(Vector3.forward * spin); // Rotate shot
    }
}
