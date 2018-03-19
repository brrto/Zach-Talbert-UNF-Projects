using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player1Shot : MonoBehaviour {

    public GameObject shot;
    public Transform shotSpawn;
    public Transform shotSpawnFanUp;
    public Transform shotSpawnFanDown;
    public string fireInput = "";
    public string throwTrigger = "";
    public float fireRate;
    public float burstRate;
    public bool upgradedWeapon;

    private int shotCount;
    private float nextFire;
    private float shotPause;
    private Animator animator;

    void Start ()
    {
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        if (Time.time > nextFire)
        {
            if (Input.GetButton(fireInput) && Time.time > shotPause)
            {
                animator.SetTrigger(throwTrigger); // Trigger throw animation

                if (!upgradedWeapon)
                {
                    shotPause = Time.time + burstRate;
                    Instantiate(shot, shotSpawn.transform); // Instantiate shot
                    shotCount++;
                }
                if (upgradedWeapon)
                {
                    Instantiate(shot, shotSpawnFanUp.transform);
                    Instantiate(shot, shotSpawn.transform);
                    Instantiate(shot, shotSpawnFanDown.transform);
                }

                GetComponent<AudioSource>().pitch = Random.Range(.75f, 1.25f);
                GetComponent<AudioSource>().Play(); // Play throw audio clip
            }
            if (!upgradedWeapon && shotCount == 2)
            {
                nextFire = Time.time + fireRate;
                shotCount = 0;
            }
            if (upgradedWeapon)
            {
                nextFire = Time.time + fireRate;
            }
        }
    }
}
