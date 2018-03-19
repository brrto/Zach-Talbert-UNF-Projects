using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePlayer : MonoBehaviour {

    public int speed; // Movement speed
    public float xMin, xMax, yMin, yMax; // Movement boundary

    // Allows for separate controls for both players
    public string yAxis = "";
    public string xAxis = "";

    public string idleTrigger = "";
    public string walkTrigger = "";

    private Animator animator;

    void Start()
    {
        animator = GetComponent<Animator>();
    }

    void FixedUpdate ()
    {
        float moveVertical = Input.GetAxisRaw(yAxis);
        float moveHorizontal = Input.GetAxisRaw(xAxis);
        GetComponent<Rigidbody2D>().velocity = new Vector2(moveHorizontal, moveVertical) * speed;
        
        // Keeps the players from leaving the screen
        GetComponent<Rigidbody2D>().position = new Vector2
            (
            Mathf.Clamp(GetComponent<Rigidbody2D>().position.x, xMin, xMax),
            Mathf.Clamp(GetComponent<Rigidbody2D>().position.y, yMin, yMax)
            );

        // Set trigger to transition to walking animation
        if (moveHorizontal != 0 || moveVertical != 0)
            animator.SetTrigger(walkTrigger);
        else
            animator.SetTrigger(idleTrigger);
    }
}
