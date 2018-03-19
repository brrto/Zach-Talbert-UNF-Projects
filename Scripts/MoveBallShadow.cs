using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveBallShadow : MonoBehaviour {

    public Transform follows;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        GetComponent<Transform>().position = new Vector2(follows.position.x, follows.position.y - 0.8f);
    }
}
