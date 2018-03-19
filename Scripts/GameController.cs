using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour {

    public GameObject EnergyBall;

    public float spawnWait;

    void Start ()
    {
        //EnergyBall.SetActive(true);
    }
	
	void Update ()
    {
        if (Time.time > spawnWait)
        {
            spawnWait = Time.time + spawnWait;
            if (!EnergyBall)
            {
                EnergyBall.SetActive(true);
            }
            else
            {
                EnergyBall.SetActive(false);
            }
        }
    }
}
