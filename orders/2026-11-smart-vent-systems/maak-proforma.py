import sys
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, black
out=sys.argv[1]
O=HexColor("#F28C00"); INK=HexColor("#16181A"); G=HexColor("#6B7076"); L=HexColor("#E6E8EB")
c=canvas.Canvas(out,pagesize=A4); W,H=A4
c.setTitle("Pro-formafactuur PF-2026-1106-SVS - P3PrintShop"); c.setAuthor("P3Media / P3PrintShop")
c.setFillColor(O); c.circle(24*mm,H-22*mm,7*mm,fill=1,stroke=0)
c.setFillColor(INK); c.setFont("Helvetica-Bold",12); c.drawCentredString(24*mm,H-24*mm,"P3")
c.setFont("Helvetica-Bold",15); c.drawString(34*mm,H-20*mm,"P3PRINTSHOP")
c.setFont("Helvetica",8.5); c.setFillColor(G); c.drawString(34*mm,H-25*mm,"Drukwerk dat meedenkt.  -  p3printshop.be")
c.setFont("Helvetica",8.5); c.setFillColor(INK)
y=H-17*mm
for s in ["P3Media (eenmanszaak)","Wielewaalstraat 25, 3582 Beringen","KBO 1026.676.704  -  btw BE1026676704","+32 485 14 51 88  -  info@p3media.be"]:
    c.drawRightString(W-18*mm,y,s); y-=4.2*mm
c.setFillColor(O); c.rect(18*mm,H-40*mm,W-36*mm,0.8*mm,fill=1,stroke=0)
c.setFillColor(INK); c.setFont("Helvetica-Bold",20); c.drawString(18*mm,H-54*mm,"Pro-formafactuur")
c.setFont("Helvetica",8.5); c.setFillColor(G); c.drawString(18*mm,H-59*mm,"Betaalverzoek vooraf. De definitieve factuur volgt via ons boekhoudpakket na levering.")
# klant + gegevens
c.setFillColor(G); c.setFont("Helvetica-Bold",7.5); c.drawString(18*mm,H-72*mm,"KLANT")
c.setFillColor(INK); c.setFont("Helvetica",9.5); y=H-77*mm
for s in ["SOPO BV - Smart Vent Systems","t.a.v. Patrick Theunis","patrick@smartventsystems.be","Btw-nummer: [in te vullen]","Adres: [in te vullen]"]:
    c.drawString(18*mm,y,s); y-=4.8*mm
c.setFillColor(G); c.setFont("Helvetica-Bold",7.5); c.drawString(118*mm,H-72*mm,"GEGEVENS")
rows=[("Nummer","PF-2026-1106-SVS"),("Datum","vrijdag 6 november 2026"),("Te betalen voor","maandag 9 november 2026, 11u00"),("Levering","dinsdag 10 november 2026 (spoed)"),("Referentie","5 roll-ups beurs 13/11")]
y=H-77*mm
for k,v in rows:
    c.setFillColor(G); c.setFont("Helvetica",8.5); c.drawString(118*mm,y,k)
    c.setFillColor(INK); c.setFont("Helvetica-Bold",8.5); c.drawString(146*mm,y,v); y-=4.8*mm
# tabel
top=H-112*mm
c.setFillColor(HexColor("#F4F5F7")); c.rect(18*mm,top-2*mm,W-36*mm,8*mm,fill=1,stroke=0)
c.setFillColor(G); c.setFont("Helvetica-Bold",7.5)
c.drawString(21*mm,top+1*mm,"OMSCHRIJVING"); c.drawRightString(140*mm,top+1*mm,"AANTAL"); c.drawRightString(160*mm,top+1*mm,"PRIJS"); c.drawRightString(W-21*mm,top+1*mm,"EXCL. BTW")
items=[
 ("Roll-up banner Basic, 100 x 200 cm",["Aluminium cassette met gevoerde draagtas (ritssluiting)","Een zijde full colour op 510 g frontlit","5 verschillende ontwerpen (SVS 01 t/m 05), 1 stuk per ontwerp"],"5","63,59","317,95"),
 ("Verzending met spoed",["Levering dinsdag 10 november 2026 in België","Mits goedgekeurde bestanden en betaling uiterlijk ma 9/11, 11u00"],"1","44,00","44,00"),
 ("Technische bestandscontrole",["Formaat, afloop, cassettezone, kleur en resolutie van de 5 PDF's,","omzetten naar het template van onze drukker, proef ter goedkeuring"],"5","0,00","inbegrepen"),
]
y=top-9*mm
for t,sub,q,p,tot in items:
    c.setFillColor(INK); c.setFont("Helvetica-Bold",9.5); c.drawString(21*mm,y,t)
    c.setFont("Helvetica",9.5); c.drawRightString(140*mm,y,q); c.drawRightString(160*mm,y,"EUR "+p if p!="0,00" else "-"); c.drawRightString(W-21*mm,y,("EUR "+tot) if tot[0].isdigit() else tot)
    c.setFillColor(G); c.setFont("Helvetica",8)
    for s in sub: y-=4.2*mm; c.drawString(21*mm,y,s)
    y-=4*mm; c.setStrokeColor(L); c.setLineWidth(0.6); c.line(18*mm,y,W-18*mm,y); y-=6*mm
# totalen
y-=2*mm
for k,v,b in [("Totaal excl. btw","EUR 361,95",False),("Btw 21%","EUR 76,01",False)]:
    c.setFillColor(G); c.setFont("Helvetica",9.5); c.drawString(120*mm,y,k); c.setFillColor(INK); c.drawRightString(W-21*mm,y,v); y-=6*mm
c.setFillColor(O); y-=3*mm; c.roundRect(116*mm,y-5*mm,W-134*mm,11*mm,2*mm,fill=1,stroke=0)
c.setFillColor(INK); c.setFont("Helvetica-Bold",11); c.drawString(120*mm,y-0.5*mm,"Te betalen"); c.drawRightString(W-21*mm,y-0.5*mm,"EUR 437,96")
# betaling
y-=22*mm
c.setFillColor(G); c.setFont("Helvetica-Bold",7.5); c.drawString(18*mm,y,"BETALING"); y-=5.5*mm
c.setFillColor(INK); c.setFont("Helvetica",9.5)
for s in ["Overschrijving van EUR 437,96 op IBAN [IBAN P3Media]  -  BIC [BIC]","Mededeling: PF-2026-1106-SVS","Uiterlijk maandag 9 november 2026 om 11u00. Een betaalbewijs per mail volstaat om de productie te starten."]:
    c.drawString(18*mm,y,s); y-=5*mm
y-=5*mm
c.setFillColor(G); c.setFont("Helvetica-Bold",7.5); c.drawString(18*mm,y,"VOORWAARDEN SPOEDLEVERING"); y-=5.5*mm
c.setFillColor(INK); c.setFont("Helvetica",8.5)
for s in ["- De leverdag van dinsdag 10 november geldt alleen als de 5 drukbestanden en de betaling",
          "  uiterlijk maandag 9 november om 11u00 binnen zijn.",
          "- Elk bestand wordt pas gedrukt na schriftelijke goedkeuring van de proef door de klant.",
          "- De aangeleverde PDF's zijn opgemaakt voor een ander template (102 x 217 cm, 15 cm cassette). Wij zetten ze kosteloos om.",
          "- Enkele beelden hebben een lage resolutie (logo, productfoto banner 4, foto banner 5). Wij melden dit; de klant beslist.",
          "- Deze pro-forma is geen btw-factuur. Geldig tot maandag 9 november 2026, 11u00."]:
    c.drawString(18*mm,y,s); y-=4.6*mm
c.setStrokeColor(L); c.line(18*mm,18*mm,W-18*mm,18*mm)
c.setFillColor(G); c.setFont("Helvetica",7.5); c.drawString(18*mm,13*mm,"P3PrintShop is een handelsnaam van P3Media - Wielewaalstraat 25, 3582 Beringen - btw BE1026676704 - algemene voorwaarden op p3printshop.be")
c.showPage(); c.save()
