// generate streamable url from given signatureCipher
export default function getUrlStream(signatureCipher: string) {
  var PP = {
    U0: function (a: any, b: any) {
      var c = a[0];
      a[0] = a[b % a.length];
      a[b % a.length] = c;
    },
    ng: function (a: any) {
      a.reverse();
    },
    mM: function (a: any, b: any) {
      a.splice(0, b);
    },
  };

  var YLa = function (a) {
    a = a.split("");
    PP.ng(a, 57);
    PP.mM(a, 2);
    PP.U0(a, 24);
    PP.U0(a, 44);
    PP.mM(a, 1);
    PP.ng(a, 32);
    PP.U0(a, 6);
    return a.join("");
  };

  // the chipper have 3 query parameter ("s", "sp", "url")
  const chipper = new URLSearchParams(signatureCipher);

  // get base url
  const BASE_URL = chipper.get("url");

  // decode the "s" query parameter value
  const decodedS = YLa(chipper.get("s"));

  // generate streamable url by append it back "decodedS" value to the BASE_URL as a query parameter identified by "sig".
  return `${BASE_URL}&sig=${decodedS}`;
}
