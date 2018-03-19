using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class HUD : MonoBehaviour {

    public Sprite[] p1healthSprites;
    public Sprite[] p2healthSprites;
    public Image p1healthUI;
    public Image p2healthUI;

    public Sprite[] p1energySprites;
    public Sprite[] p2energySprites;
    public Image p1energyUI;
    public Image p2energyUI;

    private HealthManager p1Health;
    private HealthManager p2Health;

    private EnergyManager p1energy;
    private EnergyManager p2energy;

    void Start ()
    {
        p1Health = GameObject.FindGameObjectWithTag("Player").GetComponent<HealthManager>();
        p2Health = GameObject.FindGameObjectWithTag("Player2").GetComponent<HealthManager>();

        p1energy = GameObject.FindGameObjectWithTag("Player").GetComponent<EnergyManager>();
        p2energy = GameObject.FindGameObjectWithTag("Player2").GetComponent<EnergyManager>();
    }

    void Update ()
    {
        if (p1Health.health > 0)
        {
            p1healthUI.sprite = p1healthSprites[(p1Health.health) - 1];
        }
        if (p2Health.health > 0)
        {
            p2healthUI.sprite = p2healthSprites[(p2Health.health) - 1];
        }

        if (p1energy.energy < 12)
        {
            p1energyUI.sprite = p1energySprites[(p1energy.energy)];
        }
        if (p2energy.energy < 12)
        {
            p2energyUI.sprite = p2energySprites[(p2energy.energy)];
        }
    }
}
