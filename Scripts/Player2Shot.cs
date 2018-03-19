using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player2Shot : MonoBehaviour {

    public GameObject shot;
    public Transform shotSpawn;
    public float fireRate;
    public float burstRate;

    private bool firing = false;
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
        if (Time.time > shotPause)
        {
            if ((Input.GetButton("Fire2")) || firing)
            {
                animator.SetTrigger("Player2Throw");
                shotPause = Time.time + burstRate;
                Instantiate(shot, shotSpawn.transform);
                firing = true;
                shotCount++;
            }
            if (shotCount == 3)
            {
                firing = false;
                shotCount = 0;
            }
        }
    }
}
