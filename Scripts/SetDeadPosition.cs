using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetDeadPosition : MonoBehaviour {

	// Use this for initialization
	void Start () {
        Vector3 pos = GameObject.FindGameObjectWithTag("Player").GetComponent<Transform>().position;
        GetComponent<Transform>().position = pos;
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
