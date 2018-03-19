using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class EnergyManager : MonoBehaviour {

    public GameObject healthUpText;
    public GameObject speedUpText;
    public string upgrade1 = "";
    public string upgrade2 = "";
    public string upgrade3 = "";
    public int energy;
    public int energyCap;
    public float upgradeTime;

    private bool upgraded;
    private float timer;

    void Start ()
    {
        energy = 0;
        upgraded = false;
    }
	
	public void addEnergy ()
    {
        if (!upgraded)
        {
            if (energy < energyCap)
            {
                energy++;
            }
        }
    }

    public void getUpgrade (string upgrade)
    {
        upgraded = true;
        timer = Time.time + upgradeTime;

        if (upgrade == "Weapon")
        {
            if (SceneManager.GetActiveScene().name == "Main")
            {
                GetComponent<Player1Shot>().upgradedWeapon = true;
            }
        }

        if (upgrade == "Speed")
        {
            if (SceneManager.GetActiveScene().name == "Main")
            {
                GetComponent<MovePlayer>().speed += 1;
                Instantiate(speedUpText, GetComponent<Transform>());
            }
        }

        if (upgrade == "Health")
        {
            if (SceneManager.GetActiveScene().name == "Main")
            {
                GetComponent<HealthManager>().addHealth();
                Instantiate(healthUpText, GetComponent<Transform>());
            }
        }
    }

    void Update()
    {
        if (Time.time > timer && upgraded)
        {
            energy = 0;
            upgraded = false;
            GetComponent<Player1Shot>().upgradedWeapon = false;
        }

        // Weapon upgrade
        if (energy == energyCap && !upgraded && Input.GetButton(upgrade1))
        {
            getUpgrade("Weapon");
        }

        // Speed upgrade
        if (energy == energyCap && !upgraded && Input.GetButton(upgrade2))
        {
            getUpgrade("Speed");
        }

        // Health upgrade
        if (energy == energyCap && !upgraded && Input.GetButton(upgrade3))
        {
            getUpgrade("Health");
        }
    }
}