using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveEnergyBall : MonoBehaviour {

    public float speed; // Movement speed
    public float spin; // Spin speed
	
    void Start ()
    {
        GetComponent<Rigidbody2D>().velocity = new Vector2(0, -1) * speed;
    }

	void FixedUpdate ()
    {
        GetComponent<Transform>().Rotate(Vector3.forward * spin);

        if (GetComponent<Rigidbody2D>().position.y > 1)
        {
            GetComponent<Rigidbody2D>().velocity = new Vector2(0, -1) * speed;
        }
        if (GetComponent<Rigidbody2D>().position.y < -4.5)
        {
            GetComponent<Rigidbody2D>().velocity = new Vector2(0, 1) * speed;
        }
    }
}
