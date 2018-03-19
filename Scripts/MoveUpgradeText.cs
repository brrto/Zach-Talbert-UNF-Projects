using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveUpgradeText : MonoBehaviour {

    public float speed;
    public float lifespan;

    private float timestamp;
	
    void Start ()
    {
        timestamp = Time.time;
    }

    void FixedUpdate ()
    {
        GetComponent<Rigidbody2D>().velocity = new Vector2(0, 1) * speed;
    }

    void Update ()
    {
        if (lifespan < Time.time - timestamp)
            Destroy(gameObject);
    }
}
